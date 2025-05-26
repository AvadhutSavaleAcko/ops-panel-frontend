import Calendar from "@acko-tech/building-blocks.ui.calendar";
import { CalendarWrapper, CueTextContainer } from "./styles";
import React, { useContext, useEffect, useState } from "react";
import { getWidgetSpecificIsVisible } from "@utils/index";

import { connect } from "react-redux";
import { DateFormats, policyExpiredTimeStatus } from "@utils/date";
import { setPayload } from "@actions/setPayloadData";
import { useDispatch } from "react-redux";
import { Context } from "@components/useContext/context";
import DOMPurify from "isomorphic-dompurify";
import { setPayloadData } from "@store/slices/globalState";
import { setAnalytics } from "@actions/setAnalyticsData";
import { useOnload } from "@utils/useOnLoad";
import dateFormat from "date-fns/format";

const mapStateToProps = function (state: any, ownProps: any) {
  return {
    is_visible: getWidgetSpecificIsVisible(
      state.configuration?.normalisedConfig,
      ownProps.id
    )
  };
};

const DesktopCalendar = (props: any) => {
  const dispatch = useDispatch();
  const { isDesktop } = useContext(Context);
  // todo: check with product to add a default date or not ?
  const [defaultDate, setDefaultDate] = useState<any>(null);
  const { styles, payloadData, subHeading, actions } = props;
  const { value } = payloadData || {};

  const { on_load, on_change, on_click } = actions || {};

  useOnload({ on_load });

  const handleClick = (date: any) => {
    const ppedDate = new Date(date)?.setHours(...policyExpiredTimeStatus);
    console.log("^^^^^ ppedDate", { ppedDate });
    dispatch(
      setPayloadData({
        [payloadData?.name]: ppedDate
      })
    );
    setAnalytics({
      [payloadData?.name]: `${dateFormat(
        new Date(ppedDate),
        DateFormats.ISO_DATE
      )}T05:30:00+05:30`
    });
    if (on_change?.[0] && typeof on_change[0].funCall === "function") {
      on_change[0].funCall(on_change[0].args || {});
    }
  };

  useEffect(() => {
    if (value) {
      const prefilledDate = new Date(value);
      try {
        setDefaultDate(prefilledDate);
        setPayload({
          payloadData: {
            [payloadData?.name]: prefilledDate?.getTime()
          }
        });
      } catch (err) {
        console.log('err in date formatting inside calendar "edit_mmv"', err);
      }
    }
  }, [value]);

  const { is_visible } = props;

  return is_visible ? (
    <>
      <CalendarWrapper
        styles={styles}
        onClick={() => {
          if (on_click?.length > 0) {
            on_click?.forEach((eachFunc: any) => {
              typeof eachFunc.funCall === "function" &&
                eachFunc.funCall(eachFunc.args || {});
            });
          }
        }}
      >
        <Calendar
          {...props}
          isDesktop={isDesktop}
          onSelect={handleClick}
          defaultDate={defaultDate}
          height="auto"
          labelStyles={{ fontSize: "12px" }}
          readOnlyInput={true}
        />
        {!!subHeading && (
          <CueTextContainer
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(subHeading)
            }}
          />
        )}
      </CalendarWrapper>
    </>
  ) : (
    <></>
  );
};

export default connect(mapStateToProps)(DesktopCalendar);
